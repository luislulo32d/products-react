import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const ShowProducts = () => {
    const url = 'http://localhost:5000/productos';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const respuesta = await axios.get(url);
            setProducts(respuesta.data);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron obtener los productos.',
            });
        }
    };

    const handleEdit = (product) => {
        setId(product.id);
        setTitle(product.title);
        setBody(product.body);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${url}/${id}`, { title, body });
            setProducts(products.map(product => 
                product.id === id ? { ...product, title, body } : product
            ));
            resetFields();
            MySwal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'El producto ha sido actualizado exitosamente.',
                
            }).then(() => {
                window.$('#modalEditProduct').modal('hide');
            });
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el producto.',
            });
        }
    };

    const handleCreate = async () => {
        try {
            const newProduct = { title, body };
            const respuesta = await axios.post(url, newProduct);
            setProducts([...products, respuesta.data]);
            resetFields();
            MySwal.fire({
                icon: 'success',
                title: 'Creado',
                text: 'El producto ha sido creado exitosamente.',
            }).then(() => {
                window.$('#modalCreateProduct').modal('hide');
            });
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el producto.',
            });
        }
    };

    const resetFields = () => {
        setId('');
        setTitle('');
        setBody('');
    };

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Lista de Productos</h2>
            <button 
                className='btn btn-success mb-3' 
                data-bs-toggle='modal' 
                data-bs-target='#modalCreateProduct'
            >
                Nuevo Producto
            </button>
            <table className='table table-striped table-bordered shadow'>
                <thead className='table-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Cuerpo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.body}</td>
                            <td>
                                <button 
                                    onClick={() => handleEdit(product)} 
                                    className='btn btn-primary'
                                    data-bs-toggle='modal' 
                                    data-bs-target='#modalEditProduct'
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div className='modal fade' id='modalCreateProduct' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Nuevo Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Título" 
                                className="form-control" 
                            />
                            <textarea 
                                value={body} 
                                onChange={(e) => setBody(e.target.value)} 
                                placeholder="Cuerpo" 
                                className="form-control mt-2" 
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleCreate} className="btn btn-success">Crear</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className='modal fade' id='modalEditProduct' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                placeholder="Título" 
                                className="form-control" 
                            />
                            <textarea 
                                value={body} 
                                onChange={(e) => setBody(e.target.value)} 
                                placeholder="Cuerpo" 
                                className="form-control mt-2" 
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleUpdate} className="btn btn-success">Actualizar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};