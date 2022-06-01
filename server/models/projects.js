import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  personnel: [mongoose.SchemaTypes.ObjectId],
  tickets: [{
    title: String,
    description: String,
    priority: String,
    submitter: String,
    solver: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'Open'
    },
    comments: {
      commenter: String,
      message: String,
      date: Date
    }
  }]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;