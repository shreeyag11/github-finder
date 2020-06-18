import React from 'react'

const Alert = ({ alertBox }) => {
    return (
        alertBox !== null && (
            <div className={`alert alert-${alertBox.type}`}>
                <i className="fas fa-info-circle"></i>{alertBox.msg}
            </div>
        )
    )
}

export default Alert
