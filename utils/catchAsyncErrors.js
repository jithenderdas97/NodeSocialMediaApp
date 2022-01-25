module.exports = catchAsyncErrors => (req,res,next) => {
    Promise.resolve(catchAsyncErrors(req, res, next)).catch((err) => {
        next
        res.status(500).json({
            success: false,
            message: `Error message ${err}`
        })
    })
} 