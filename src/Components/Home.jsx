import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../Styles/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineLeft } from 'react-icons/ai'
import logo from '../Img/logo-senati.png'
import user from '../Img/user.png'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


function Home() {
  const [dni, setDni] = useState('');
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fechaHoraActual, setFechaHoraActual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaHoraActual(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const buscar = async (event) => {
    event.preventDefault();
    const response = await fetch(`/v1/dni?numero=${dni}`, {
      headers: {
        'Referer': 'https://apis.net.pe/consulta-dni-api',
        'Authorization': `Bearer apis-token-5897.-WuqWnqRwXVMSvLDI4hDcjbGFiJWp-Zl`
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.numeroDocumento) {
        setData(data);
        handleShow();
      } else {
        alert('El DNI ingresado no existe.');
      }
    } else {
      alert('Hubo un error al buscar el DNI.');
    }
  };

  return (
    <div className="home">
      <div className="secc-home w-100 vh-100 d-flex justify-content-center align-items-center text-center">
        <div className="secc-dni">
          <form className="formulario p-5" onSubmit={buscar}>
            <h1>CONSULTA TU DNI</h1>
            <label htmlFor="">DNI:</label>
            <input type="text" maxLength={8} minLength={8} value={dni} onChange={e => setDni(e.target.value)} required={true} />
            <button className="enviar mx-5 mb-2 mt-4" type="submit" >CONSULTAR</button>
          </form>
          <p>Para más información: <a href="https://www.senati.edu.pe/">SENATI</a></p>
        </div>
      </div>
      <Modal className="mi modal d-flex align-items-center justify-content-center" show={show} onHide={handleClose} >

        <Modal.Body style={{ backgroundColor: "#3E50A8", borderRadius: "5px", color: "#fff" }}>
          {data && (
            <div className='cont-credencial'>
              <div className="header-credencial d-flex justify-content-between">
                <AiOutlineLeft onClick={handleClose} className='icon mt-1' style={{ cursor: "pointer" }} />
                <h1>Fotocheck</h1>
                <h1> </h1>
              </div>
              <hr className='borde' />
              <div className="row credencial">
                <div className="datos-credencial col-md-4">
                  <h1>Carnet Estudiantil</h1>
                  <div className="foto bg-light">
                    <img className='user' src={user} alt="" />
                  </div>
                  <img className='mt-2' src={logo} alt="" />
                </div>
                <div className="col-md-4 mt-5">
                  <p className='datos'>{data.nombres}</p>
                  <p className='datos'>{data.apellidoPaterno} {data.apellidoMaterno}</p>
                  <p>DNI: {data.numeroDocumento}</p>
                </div>
                <div className="hora col-md-4">
                  <p className='hora-minuto'>{`${fechaHoraActual.getHours()}:${fechaHoraActual.getMinutes()}:${fechaHoraActual.getSeconds()}`}</p>
                  <p className='fecha'>{`${fechaHoraActual.getDate()}-${fechaHoraActual.getMonth() + 1}-${fechaHoraActual.getFullYear()}`}</p>
                  <h1>SOMOS <span style={{ color: "#748BFF" }}>FUTURO</span></h1>
                </div>
              </div>

            </div>
          )}
        </Modal.Body>
      </Modal>


    </div>
  )
}

export default Home;
