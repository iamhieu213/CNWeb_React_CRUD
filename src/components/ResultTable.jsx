import { useState, useEffect, useCallback, useMemo } from 'react'

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

function ResultTable({ searchQuery, newUser, onUserAddedComplete }) {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const data = await response.json();
                setUserList(data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (newUser) {
            setUserList(prevList => {
                const nextId = Math.max(...prevList.map(u => u.id), 0) + 1;
                return [...prevList, { ...newUser, id: nextId }];
            });
            onUserAddedComplete();
        }
    }, [newUser, onUserAddedComplete]);

    const filteredUserList = useMemo(() => {
        if (!searchQuery.trim()) {
            return userList;
        }
        const query = searchQuery.toLowerCase();
        return userList.filter(user => 
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query)
        );
    }, [userList, searchQuery]);

    const startEditing = useCallback((user) => {
        setEditingUser({
            ...user,
            address: { ...user.address }
        });
    }, []);

    const cancelEditing = useCallback(() => {
        setEditingUser(null);
    }, []);

    const updateEditingField = useCallback((fieldName, fieldValue) => {
        setEditingUser(prev => {
            if (!prev) return null;
            if (fieldName === "city") {
                return {
                    ...prev,
                    address: {
                        ...prev.address,
                        city: fieldValue
                    }
                };
            }
            return {
                ...prev,
                [fieldName]: fieldValue
            };
        });
    }, []);

    const handleEditFieldChange = useCallback((fieldName) => (event) => {
        updateEditingField(fieldName, event.target.value);
    }, [updateEditingField]);

    const saveEditedUser = useCallback(() => {
        if (!editingUser) return;
        
        setUserList(prevList => 
            prevList.map(user => 
                user.id === editingUser.id ? editingUser : user
            )
        );
        setEditingUser(null);
    }, [editingUser]);

    const deleteUser = useCallback((userId) => {
        setUserList(prevList => prevList.filter(user => user.id !== userId));
    }, []);

    if (isLoading) {
        return <div className="loading-message">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="result-table-container">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserList.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="no-results">
                                Không tìm thấy người dùng nào
                            </td>
                        </tr>
                    ) : (
                        filteredUserList.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address.city}</td>
                                <td>
                                    <button 
                                        className="btn-edit"
                                        onClick={() => startEditing(user)}
                                        type="button"
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => deleteUser(user.id)}
                                        type="button"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            
            {editingUser && (
                <div className="edit-form">
                    <h4>Chỉnh sửa người dùng</h4>
                    <div className="form-group">
                        <label htmlFor="edit-name">Name:</label>
                        <input 
                            id="edit-name"
                            type="text" 
                            value={editingUser.name} 
                            onChange={handleEditFieldChange("name")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-username">Username:</label>
                        <input 
                            id="edit-username"
                            type="text" 
                            value={editingUser.username} 
                            onChange={handleEditFieldChange("username")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-email">Email:</label>
                        <input 
                            id="edit-email"
                            type="text" 
                            value={editingUser.email} 
                            onChange={handleEditFieldChange("email")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-city">City:</label>
                        <input 
                            id="edit-city"
                            type="text" 
                            value={editingUser.address.city} 
                            onChange={handleEditFieldChange("city")}
                        />
                    </div>
                    <div className="form-actions">
                        <button 
                            className="btn-success"
                            onClick={saveEditedUser}
                            type="button"
                        >
                            Lưu
                        </button>
                        <button 
                            className="btn-secondary"
                            onClick={cancelEditing}
                            type="button"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultTable