import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { getCustomerDetailsUrl, updateCustomerInfoUrl } from '../../helpers/routes';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State para los campos editados
  const [editedFields, setEditedFields] = useState({
    id: '',
    name: '',
    lastName: '',
    personalId: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    isActive: true,
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(getCustomerDetailsUrl(id));
        const data = await response.json();
        setCustomer(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error', error);
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  useEffect(() => {
    // Cuando los datos del cliente se cargan correctamente, actualiza los campos editados
    if (customer) {
      setEditedFields({
        ...customer,
      });
    }
  }, [customer]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el campo es un checkbox, maneja el valor de 'checked'
    const newValue = type === 'checkbox' ? checked : value;

    setEditedFields({
      ...editedFields,
      [name]: newValue,
    });
  };

  // Define la función handleSave para guardar los cambios
  const handleSave = async () => {
    try {
      const response = await fetch(updateCustomerInfoUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({editedFields}),
      });

      // Aquí puedes manejar la respuesta del servidor si es necesario

    } catch (error) {
      console.error('Error', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Edit Customer</h2>
      <form>
        <div>
          <label htmlFor="id">Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={editedFields.id}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedFields.name}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={editedFields.lastName}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="personalId">Personal ID:</label>
          <input
            type="text"
            id="personalId"
            name="personalId"
            value={editedFields.personalId}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={editedFields.birthDate}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedFields.address}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={editedFields.city}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={editedFields.country}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={editedFields.zipCode}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={editedFields.phoneNumber}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={editedFields.email}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={editedFields.password}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={editedFields.isActive}
            onChange={handleFieldChange}
          />
        </div>
        {/* Agrega más campos de edición según tus necesidades */}
        <button type="button" onClick={handleSave}>
          Save
        </button>
        {/* Enlace para volver a los detalles del cliente */}
        <Link to={`/customer/${id}`}>Back to Details</Link>
      </form>
    </div>
  );
};

export default EditCustomer;
