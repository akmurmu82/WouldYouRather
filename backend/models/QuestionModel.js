const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        questionText: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [
                {
                    optionText: { type: String, required: true },
                    votes: { type: Number, default: 0 },
                },
            ],
            validate: [arrayLimit, '{PATH} must have exactly 2 options'],
            required: true,
        },
        category: {
            type: String,
            enum: ['Funny', 'Personal', 'Random', 'Serious', 'Creative', 'Other'],
            default: 'Other',
        },
        // createdBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User', // Assumes a User model exists
        //     required: true,
        // },
        public: {
            type: Boolean,
            default: true, // True if visible to everyone, False if private
        },
        stats: {
            totalVotes: { type: Number, default: 0 },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

// Helper function to validate options array
function arrayLimit(val) {
    return val.length === 2; // Ensures exactly two options
}

module.exports = mongoose.model('Question', questionSchema);
