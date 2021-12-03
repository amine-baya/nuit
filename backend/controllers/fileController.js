// @desc    Delete a file
// @route   DELETE /api/files/:id
const deleteFile = asyncHandler(async (req, res) => {

  
    const file = await File.findById(req.params.id)
  
    if (file) {
      await file.remove()
      res.json({ message: 'File removed' })
    } else {
      res.status(404)
      throw new Error('File not found')
    }
  })
  
  // @desc    Create a file
  // @route   POST /api/files 

  const createFiles = asyncHandler(async (req, res) => {
    const {
      image 
    } = req.body 
  
    console.log(req.user)
  
    const file = new File({
      
      user: req.user._id, 
      image
     
      
    }) 
  
    const createdFile = await file.save()
    res.status(201).json(createdFile) 
  })
  
  
  // @desc    Update a file
  // @route   PUT /api/files/:id
  
  const updateFile = asyncHandler(async (req, res) => { 
    const {
    
      image, 
     
    } = req.body 
  
    const file = await File.findById(req.params.id)
  
    if (file) {
     
      file.image = image
     
      
  
      const updatedFile = await file.save()
      res.json(updatedFile)
    } else {
      res.status(404)
      throw new Error('File not found')
    }
  })