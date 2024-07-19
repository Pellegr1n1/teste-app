import React from 'react';
import { Modal } from 'antd';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";


const ModalAbout = ({ isModalOpen, closeModal }) => {

    return (
        <Modal
            title="MARKET & CLIENT"
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
        >
            <div>
                <p className='text-justify'>
                    Este projeto nasceu com a necessidade da realização de um sistema para a
                    matéria de Programação Web do Curso de Engenharia de Software realizado no
                    Centro Universitário Catolica de Santa Catarina em Joinville. No entanto, mesmo
                    após a entrega do mesmo ao professor, melhoria e features estão sendo adiconadas ao
                    projeto.
                </p>

                <div className='flex flex-col items-center'>
                    <p className='mt-10 font-bold'>Desenvolvido por:</p>
                    <div className='flex items-center'>
                        <p className='mr-[8px]'>Humberto Peres da Rocha Filho</p>
                        <a href='https://www.linkedin.com/in/humberto-peres-da-rocha-filho-735574210' target='_blank' rel='noopener noreferrer' className='mr-[5px]'>
                            <FaLinkedin size={20} color='#0e76a8'/>
                        </a>
                        <a href='https://github.com/humberto-peres' target='_blank' rel='noopener noreferrer'>
                            <FaGithub size={20} />
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <p className='mr-[8px]'>Leandro Pellegrini Fodi</p>
                        <a href='https://www.linkedin.com/in/leandro-pellegrini-fodi-1a15ba210' target='_blank' rel='noopener noreferrer' className='mr-[5px]'>
                            <FaLinkedin size={20} color='#0e76a8'/>
                        </a>
                        <a href='https://github.com/Pellegr1n1' target='_blank' rel='noopener noreferrer'>
                            <FaGithub size={20}/>
                        </a>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAbout;
