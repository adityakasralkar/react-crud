import React,{useState} from 'react';
import "./Crud.css"

function Crud() {

      const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({ firstName: '', lastName: '' });

  const handleFirstNameChange = (event) => {
    setCurrentItem((prevItem) => ({ ...prevItem, firstName: event.target.value }));
  };

  const handleLastNameChange = (event) => {
    setCurrentItem((prevItem) => ({ ...prevItem, lastName: event.target.value }));
  };

  const handleAddItem = () => {
    setData((prevData) => [...prevData, { ...currentItem, id: Date.now() }]);
    setCurrentItem({ firstName: '', lastName: '' });
  };

  const handleEditItem = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setCurrentItem(itemToEdit);
    setEditMode(true);
  };

  const handleUpdateItem = () => {
    setData((prevData) => {
      const indexToUpdate = prevData.findIndex((item) => item.id === currentItem.id);
      const updatedData = [...prevData];
      updatedData[indexToUpdate] = currentItem;
      return updatedData;
    });
    setCurrentItem({ firstName: '', lastName: '' });
    setEditMode(false);
  };

  const handleDeleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      handleUpdateItem();
    } else {
      handleAddItem();
    }
  };



  return (
    <>
        <div className='container'>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={currentItem.firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={currentItem.lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
        {editMode && <button type="button" onClick={() => setEditMode(false)}>Cancel</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>
                <button onClick={() => handleEditItem(item.id)}>Edit</button>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  )
}

export default Crud