import Layout from "../hocs/Layout"
import { connect } from 'react-redux';
import { useEffect } from "react";
import '../styles/home.css';
import logoHome from '../assets/img/home.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faBookOpen, faRobot, faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import Projects from "../components/pages/Projects";
import { Set_view_new_project } from '../redux/actions/projects';
import NewProjects from "../components/pages/NewProjects";
import EditProject from "../components/pages/EditProject";

const Home = ({
    Set_view_new_project,
    user
}) => {

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  const onClick = (e) =>{
    Set_view_new_project(true)
  }

  return(
    <Layout>
        <section className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <h1 className="display-5 fw-bolder text-white mb-2">CIGRE C2.5 Aplicaciones de IA en Redes Eléctricas</h1>
                            <p className="lead fw-normal text-white-50 mb-4">Uniendo los modelos de inteligencia artificial con los modelos eléctricos, para la toma de decisión en la operación del sistema</p>
                            {/* <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                                <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={logoHome} alt="..." /></div>
                </div>
            </div>
        </section>
        <section className="py-5" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="col-lg-4 mb-1 mb-lg-0"><h2 className="fw-bolder mb-0">Una manera de empezar a construir</h2></div>
                    <div className="col-lg-8">
                        <div className="row gx-5 row-cols-1 row-cols-md-2">
                            <div className="col mb-5 h-100">
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><FontAwesomeIcon icon={faDatabase} /></div>
                                <h2 className="h5">Bases de datos eléctricas</h2>
                                <p className="mb-0">Mantenimiento de bases de datos que permiten ser usadas en los modelos de IA.</p>
                            </div>
                            <div className="col mb-5 h-100">
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><FontAwesomeIcon icon={faBookOpen} /></div>
                                <h2 className="h5">Revisiones bibliográfica</h2>
                                <p className="mb-0">Documentación del estado del arte que nos permite conocer los modelos y avances en IA.</p>
                            </div>
                            <div className="col mb-5 mb-md-0 h-100">
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><FontAwesomeIcon icon={faRobot} /></div>
                                <h2 className="h5">Modelos de IA</h2>
                                <p className="mb-0">Almacenamiento de modelos de IA basado en la información del estado del arte y ajustados a los datos obtenidos.</p>
                            </div>
                            <div className="col h-100">
                                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-1"><FontAwesomeIcon icon={faDiagramProject} /></div>
                                <h2 className="h5">Plantillas con datos y modelos entrenados</h2>
                                <p className="mb-0">Modelos con la parametrización obtenida para el mejor ajuste a los datos de interés.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-0">
            <div className="container px-8 my-1">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-12 col-xl-9">
                        <div className="text-center">
                            <h2 className="fw-bolder">Nuestros Proyectos</h2>
                            <p className="lead fw-normal text-muted mb-5">
                                En el Grupo CIGRE C2.5 estamos trabajando los siguientes 
                                modelos de IA aplicados a sistemas eléctricos. 
                                {user && user.id!==8? 
                                <p>También puedes crear un
                                <button 
                                    type="button" 
                                    onClick={onClick} 
                                    className="btn btn-sm btn-link shadow-none">                                    
                                    <p className="lead fw-normal text-muted m-0 mb-2 p-0">Nuevo Proyecto</p>
                                </button>
                                </p>:null}
                            </p>
                        </div>
                    </div>
                </div>
                <NewProjects />
                <EditProject />
                <Projects />
                <aside className="bg-primary bg-gradient rounded-3 p-4 p-sm-5 mt-5">
                    <div className="d-flex align-items-center justify-content-between flex-column flex-xl-row text-center text-xl-start">
                        <div className="mb-4 mb-xl-0">
                            <div className="fs-3 fw-bold text-white">CIGRE COLOMBIA</div>
                            <div className="text-white-50 text-justify">Tiene por objeto facilitar y promover el intercambio de 
                                conocimientos técnicos e información entre la organización central del Consejo
                                Internacional de Grandes Redes Eléctricas CIGRE, los comités nacionales y los asociados de CIGRE COLOMBIA​</div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    </Layout>
  )
}


const mapStateToProps = state => ({
    user: state.Auth.user
})

export default connect(mapStateToProps,{
    Set_view_new_project
}) (Home)