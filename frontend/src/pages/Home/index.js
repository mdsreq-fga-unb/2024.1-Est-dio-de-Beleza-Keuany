import React from 'react';
import profilePic from '../../assets/profilePic.png'; // Foto de perfil
import locationicon from '../../assets/locationicon.png'; // Ícone de localização
import whatsappIcon from '../../assets/whatsappIcon.png'; // Ícone do WhatsApp
import instagramIcon from '../../assets/instagramIcon.png'; // Ícone do Instagram
import testa from '../../assets/testa.png'; // Imagem de sobrancelha

const Home = () => {
    return (
    <div className="col p-5 overflow-auto h-100">
    <div className="d-flex flex-column vh-100">
        <div className="container-fluid p-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={profilePic} alt="Profile" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
                    <div className="ms-4">
                        <h1 className="custom-font-h1">Keuany Gomes</h1>
                        <h2 className="custom-font-h2">Designer de sobrancelhas</h2>
                    </div>
                </div>
                <div className="text-end">
                    <div className="d-flex align-items-center mb-2">
                        <img src={locationicon} alt="Location" style={{ width: '20px', marginRight: '10px' }} />
                        <span>Itapoã, DF</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                    <a href="https://wa.me/89981504285/" target='_blank' style={{textDecoration: 'none', color: 'inherit'}}>
                            <img src={whatsappIcon} alt="WhatsApp" style={{ width: '20px', marginRight: '10px' }} />
                            <span>(89) 98150-4285</span>
                        </a>
                    </div>
                    <div className="d-flex align-items-center">
                        <a href="https://www.instagram.com/keuanygomes/" target='_blank'  style={{textDecoration: 'none', color: 'inherit'}}>
                            <img src={instagramIcon} alt="Instagram" style={{ width: '20px', marginRight: '10px' }} />
                            <span>@keuanygomes</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="content-section mt-5 p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between m-2">
                    <div className="col-7">
                        <p className='details'>O estúdio de design de sobrancelhas Keuany é um
                            espaço especializado em cuidar e realçar a 
                            beleza do olhar através da modelagem e 
                            manutenção das sobrancelhas. Neste ambiente,
                            profissionais capacitados utilizam técnicas 
                            personalizadas para cada cliente, levando em
                            consideração o formato do rosto, estilo pessoal
                            e características naturais das sobrancelhas. 
                            O estúdio oferece serviços como limpeza, 
                            modelagem, tintura, e técnicas avançadas como
                            micropigmentação e henna, proporcionando um 
                            atendimento exclusivo e confortável em um espaço acolhedor
                            e moderno. O objetivo principal é destacar a beleza natural
                            de cada pessoa, garantindo um resultado harmonioso
                            e duradouro.</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                    <img src={testa} alt="Sobrancelha" className="rounded" style={{ width: '100%', borderRadius: '50px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}} />

                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default Home;
