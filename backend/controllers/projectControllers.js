import Article from '../models/articleModel.js';
import Project from '../models/projectModel.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('articles');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('articles');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { user, articles, name } = req.body;
    const project = await Project.create({ user, articles, name });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { user, articles, name } = req.body;
    const project = await Project.findById(req.params.id);
    if (project) {
      project.user = user;
      project.articles = articles;
      project.name = name;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {

      for (const element of project.articles) {
        try {
          const article = await Article.findById(element._id);
          if (article) {
            await article.remove();
          }
        } catch (error) {
          // Handle the error here
          console.log(error)
        }
      }
      
      await project.remove();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProjectsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log("user id ",userId);
      const projects = await Project.find({ user: userId }).populate('articles');
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };


export { getProjects, getProjectById, createProject, updateProject, deleteProject,getProjectsByUser };
