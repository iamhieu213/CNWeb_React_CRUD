import { useState, useCallback } from 'react'

const INITIAL_USER_STATE = {
    name: "",
    username: "",
    email: "",
    address: {
        street: "",
        suite: "",
        city: ""
    },
    phone: "",
    website: ""
};

const ADDRESS_FIELDS = ["street", "suite", "city"];

function AddUser({ onUserAdded }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState(INITIAL_USER_STATE);

    const updateFormField = useCallback((fieldName, fieldValue) => {
        if (ADDRESS_FIELDS.includes(fieldName)) {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [fieldName]: fieldValue
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [fieldName]: fieldValue
            }));
        }
    }, []);

    const handleFieldChange = useCallback((event) => {
        const { id, value } = event.target;
        updateFormField(id, value);
    }, [updateFormField]);

    const validateForm = useCallback(() => {
        return formData.name.trim() !== "" && formData.username.trim() !== "";
    }, [formData]);

    const handleSubmit = useCallback(() => {
        if (!validateForm()) {
            alert("Vui lòng nhập Name và Username!");
            return;
        }
        
        onUserAdded(formData);
        setFormData(INITIAL_USER_STATE);
        setIsFormVisible(false);
    }, [formData, validateForm, onUserAdded]);

    const handleCancel = useCallback(() => {
        setIsFormVisible(false);
        setFormData(INITIAL_USER_STATE);
    }, []);

    const showForm = useCallback(() => {
        setIsFormVisible(true);
    }, []);

    if (!isFormVisible) {
        return (
            <div className="add-user-container">
                <button 
                    className="btn-primary"
                    onClick={showForm}
                    type="button"
                >
                    Thêm
                </button>
            </div>
        );
    }

    return (
        <div className="add-user-container">
            <div className="add-user-form">
                <h4>Thêm người dùng</h4>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name" 
                        type="text" 
                        value={formData.name} 
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        id="username" 
                        type="text" 
                        value={formData.username} 
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email" 
                        type="text" 
                        value={formData.email} 
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input 
                        id="city" 
                        type="text" 
                        value={formData.address.city} 
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        id="phone" 
                        type="text" 
                        value={formData.phone} 
                        onChange={handleFieldChange}
                    />
                </div>
                <div className="form-actions">
                    <button 
                        className="btn-success"
                        onClick={handleSubmit}
                        type="button"
                    >
                        Thêm
                    </button>
                    <button 
                        className="btn-secondary"
                        onClick={handleCancel}
                        type="button"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUser