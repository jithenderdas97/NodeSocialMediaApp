const getDatas = (records, message) => {
    let data = records.length < 1 ? {
            success: true,
            message: "No records found",
        } :  {
        success: true,
        message,
        records,
    }
    return data
}

module.exports = getDatas