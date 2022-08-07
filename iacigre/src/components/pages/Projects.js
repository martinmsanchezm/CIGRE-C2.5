import { connect } from 'react-redux';
import { edit_project, set_post_project } from '../../redux/actions/projects';
import { get_sections } from '../../redux/actions/section';
import { get_unite } from '../../redux/actions/unite';
import { Link } from "react-router-dom";
import '../../styles/card.css';
import { FaGithub } from 'react-icons/fa';


function Projects({
    list_projects,
    edit_project,
    set_post_project,
    get_sections,
    get_unite
}) {

    const onClick = (prj) =>{
        edit_project(prj)
    }

    const onSelect = (prj) =>{
        set_post_project(prj)
        get_sections(prj.id)
        get_unite(prj.id)
    }


  return (
    <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-3 justify-content-center">
        {list_projects?
            list_projects.map((prj)=>(
            <div key={prj.id} className="col-lg-4 mb-5">
                <div id="card" className="card h-100 shadow border-0" onClick={()=>onSelect(prj)}>
                    <Link to='/post' className='text-decoration-none'>
                    <img className="card-img-top" 
                            src={prj.photo? prj.photo:"https://dummyimage.com/600x350/ced4da/6c757d"} 
                            alt="..." 
                            style={{height:'15rem'}}/>
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
                                <img className="rounded-circle me-3" 
                                    src={prj.author.user_profile.photo?prj.author.user_profile.photo:"https://dummyimage.com/40x40/ced4da/6c757d"} 
                                    alt="..." 
                                    style={{height:'3rem',width:"3rem"}}/>
                                <div className="small align-items-center">
                                    <div className="fw-bold">{prj.author.name}</div>
                                    <div className="text-muted">{prj.updated_at}</div>
                                </div>
                                <div className="ms-xl-4">
                                    {prj.github?
                                        <a className="btn m-3 text-decoration-none" target="_blank" href={prj.github}><FaGithub/></a>                                        
                                    :null}
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
    set_post_project,
    get_sections,
    get_unite
})(Projects)

