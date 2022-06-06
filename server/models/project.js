import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  personnel: [String],
  tickets: {
    type: [{
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
      created: {
        type: Date,
        default: Date.now
        },
      comments: {
        type: [{
        commenter: String,
        message: String,
        created: {
          type: Date,
          default: Date.now
          }
        }],
        default: []
      },
    }],
    default: []
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;