import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import { useEffect } from 'react';
import { get_users } from '../../redux/actions/profile';
import mision from '../../assets/img/mision.PNG';
import create_grupo from '../../assets/img/create_grupo.PNG';

function About({
    get_users,
    users
}) {
    useEffect(() => {
        get_users()
      }, []);
  return (
    <Layout>
    <div className="container px-5">
        <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-12">
                <div className="text-center my-5">
                    <h1 className="fw-bolder mb-3">Creación de aplicaciones de 
                        inteligencia artificial en sistemas eléctricos y sistemas afines
                    </h1>
                    <p className="lead fw-normal text-muted mb-4">
                    La inteligencia artificial ha tenido un impacto considerable en nuestra vida cotidiana, 
                    desde las fotos que toma nuestro celular hasta los vehículos que nos transportan, 
                    presentan mejoras considerables con la integración de los modelos actuales de inteligencia 
                    artificial. En los sistemas eléctricos la integración de modelos de inteligencia artificial 
                    que permitan tomar decisiones para la operación no ha tenido la repercusión que se esperaría. 
                    Por esto, este equipo se ha creado en busca de integrar modelos de inteligencia artificial 
                    que se apliquen en los sistemas eléctricos. 
                    </p>
                </div>
            </div>
        </div>
    </div>
    <section className="py-5 bg-light" id="scroll-target">
        <div className="container px-5 my-5">
            <div className="row gx-5 align-items-center">
                <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src={create_grupo} alt="..." /></div>
                <div className="col-lg-6">
                    <h2 className="fw-bolder">Creación del grupo</h2>
                    <p className="lead fw-normal text-muted mb-0">
                        El grupo Cigré C2.5 inicio desde XM en busca de abordar las problemáticas 
                        que tenemos en el Sistema Eléctrico Colombiano mediante modelos de Inteligencia 
                        Artificial. Para esto se realizo una invitación a todas las personas que participan 
                        en el sector eléctrico o afines para que puedan aportar de forma activa en 
                        la realización de nuestros objetivos. 
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section className="py-5">
        <div className="container px-5 my-5">
            <div className="row gx-5 align-items-center">
                <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src={mision} alt="..." /></div>
                <div className="col-lg-6">
                    <h2 className="fw-bolder">Misión del equipo</h2>
                    <p className="lead fw-normal text-muted mb-0">
                        El Grupo Cigré C2.5 tiene como misión realizar un espacio para compartir conocimiento donde 
                        se encuentren modelos de inteligencia artificial aplicados a sistemas eléctricos. 
                        Este espácio contendrá datos, modelos, repositorios y ejemplos del entrenamiento realizados 
                        a los modelos con los respectivos resultados obtenidos. Estos modelos estarán a disposición de 
                        forma libre a todos los interesados en usarlos para aplicaciones en el sector eléctrico y afines. 
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section className="py-5 bg-light">
        <div className="container px-5 my-5">
            <div className="text-center">
                <h2 className="fw-bolder">Nuestro Equipo</h2>
                <p className="lead fw-normal text-muted mb-5"></p>
            </div>
            <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                {users? 
                users.map((user)=>(
                    <div key={user.id} className="col mb-5 mb-5 mb-xl-0">
                        <div className="text-center">
                            <img className="img-fluid rounded-circle mb-4 px-4" style={{width:'15rem', height:'12rem'}} src={user.photo? user.photo:"https://dummyimage.com/150x150/ced4da/6c757d"} alt="..." />
                            <h5 className="fw-bolder">{user.name}</h5>
                            <div className="fst-italic text-muted">{user.company}</div>
                        </div>
                    </div>
                )):<></>}
            </div>
        </div>
    </section>
    </Layout>
  )
}
const mapStateToProps = state => ({
    users: state.Profile.users
})
export default connect(mapStateToProps, {
    get_users
})(About)