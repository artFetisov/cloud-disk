const User = require('../models/User')
const File = require('../models/File')
const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const Uuid = require('uuid')

class FileController {
  async createDir(req, res) {
    try {
      const { type, name, parent } = req.body
      const file = new File({ type, name, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })
      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  }

  async getFiles(req, res) {
    try {
      const { sort } = req.query
      let files
      switch (sort) {
        case 'type':
          files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ type: 1 })
          break
        case 'name':
          files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ name: 1 })
          break
        case 'size':
          files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ size: 1 })
          break
        case 'date':
          files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ date: 1 })
          break
        default:
          files = await File.find({ user: req.user.id, parent: req.query.parent })
          break
      }
      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Can not get files' })
    }
  }

  async uploadfile(req, res) {
    try {
      const file = req.files.file

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      })
      const user = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' })
      }

      user.usedSpace = user.usedSpace + file.size

      let path
      if (parent) {
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: 'File already exist' })
      }

      file.mv(path)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
        filePath = parent.path + '\\' + file.name
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user.id,
      })
      console.log(dbFile)
      dbFile.save()
      user.save()

      res.json(dbFile)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Upload Error' })
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      const path = fileService.getPath(file)

      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.status(400).json({ message: 'Dowmload Error' })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Download Error' })
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      if (!file) {
        return res.status(400).json({ message: 'File not found' })
      }

      fileService.deleteFile(file)
      await file.remove()
      return res.json({ message: 'File was deleted' })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Dir is not empty' })
    }
  }

  async searchFile(req, res) {
    try {
      const searchName = req.query.search
      let files = await File.find({ user: req.user.id })
      files = files.filter((file) => file.name.includes(searchName))
      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Search Error' })
    }
  }

  async uploadAvatar(req, res) {
    try {
      console.log(req.files)
      const file = req.files.file
      const user = await User.findById(req.user.id)
      const avatarName = Uuid.v4() + '.jpg'
      console.log(avatarName)
      file.mv(config.get('staticPath') + '\\' + avatarName)
      user.avatar = avatarName
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Upload avatar error' })
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id)
      fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)
      user.avatar = null
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Delete avatar error' })
    }
  }
}

module.exports = new FileController()
