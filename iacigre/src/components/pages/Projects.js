import { connect } from 'react-redux';
import { edit_project, post_project } from '../../redux/actions/projects';
import { Link } from "react-router-dom";
import '../../styles/card.css';
function Projects({
    list_projects,
    edit_project,
    post_project
}) {

    const onClick = (prj) =>{
        edit_project(prj)
    }

    const onSelect = (prj) =>{
        post_project(prj)
    }


  return (
    <div className="row gx-5">
        {list_projects?
            list_projects.map((prj)=>(
            <div key={prj.id} className="col-lg-4 mb-5">
                <div id="card" className="card h-100 shadow border-0" onClick={()=>onSelect(prj)}>
                    <Link to='/post' className='text-decoration-none'>
                    <img className="card-img-top" src="https://dummyimage.com/600x350/ced4da/6c757d" alt="..." />
                    <div className="card-body p-4">
                        <div className="badge bg-primary bg-gradient rounded-pill mb-2">{prj.category}</div>
                        <h5 className="card-title mb-3 text-dark">{prj.title}</h5>
                        <p className="card-text mb-0 text-dark">{prj.desc}</p>
                    </div>
                    </Link>
                    <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                        <div className='p-3'></div>
                        <div id="card-footer" className="d-flex align-items-end justify-content-between">
                            <div className="d-flex align-items-center mb-2">                                
                                <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                                <div className="small align-items-center">
                                    <div className="fw-bold">{prj.author}</div>
                                    <div className="text-muted">{prj.updated_at}</div>
                                </div>                                
                                {prj.status?
                                    <div className="ms-xl-4">
                                        <button 
                                            className='btn btn-link align-items-end text-decoration-none'
                                            onClick={()=>onClick(prj)}
                                            >Editar
                                        </button>
                                    </div>
                                    :null
                                }                                
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            ))
            :
            <></>
        }
</div>
  )
}
const mapStateToProps = state => ({
    list_projects: state.Projects.list_projects,
})
export default connect(mapStateToProps, {
    edit_project,
    post_project
})(Projects)

