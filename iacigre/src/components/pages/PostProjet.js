import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import AddSection from './AddSection';
import EditSection from './EditSection';
import NewUnite from './NewUnite';
import {
    Set_view_new_section, 
    edit_section, 
    Set_view_edit_section,
    // reset_section_status
} from '../../redux/actions/section';
// import { set_post_project } from '../../redux/actions/projects';
import { delete_unite, Set_view_unite_user, reset_unite_status } from '../../redux/actions/unite';
import { useEffect, useState } from 'react';
import '../../styles/line.css';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/github';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSquareCheck, faUserPlus, faUserXmark  } from "@fortawesome/free-solid-svg-icons";
import { FaGithub } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';

function PostProject({
    post_project,
    Set_view_new_section,
    // set_post_project,
    list_sections,
    edit_section,
    Set_view_edit_section,
    // reset_section_status,
    Set_view_unite_user,
    delete_unite,
    users_unite,
    reset_unite_status
}) {
    useEffect(() => {
        // if (JSON.parse(localStorage.getItem('post_project'))){
        //     set_post_project(JSON.parse(localStorage.getItem('post_project')))
        // }
      }, []);

      const [Edit, setEdit] = useState(false);
    
    const onEdit = (section) =>{
        edit_section(section)
        Set_view_edit_section(true)
    }

    const onStateEdit = (e) =>{
        e.preventDefault();
        setEdit(!Edit)
    }

    const onJoin = (e) =>{
        e.preventDefault()
        reset_unite_status()
        Set_view_unite_user(true)
    }

  return (
    <Layout>
        {post_project?        
        <section className="py-5">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="col-lg-3">
                        <div className="d-flex align-items-center mt-lg-5 mb-1">
                            <img className="img-fluid rounded-circle" 
                                src={(post_project.author.user_profile && post_project.author.user_profile.photo)? 
                                    post_project.author.user_profile.photo
                                    :"https://dummyimage.com/50x50/ced4da/6c757d.jpg"} 
                                alt="..." 
                                style={{height:"3rem",width:"3rem"}}/>
                            <div className="ms-3">
                                <div className="fw-bold">{post_project.author.name}</div>
                                <div className="text-muted">{(post_project.author.user_profile &&
                                                            post_project.author.user_profile.user_company)? 
                                                            post_project.author.user_profile.user_company:""}
                                </div>
                            </div>                            
                        </div>
                        {users_unite.length? users_unite.map((user)=>(
                            <div key={user.id} className="d-flex align-items-between mt-lg-5 mb-1">
                                <img className="img-fluid rounded-circle" 
                                    src={(user.user_profile && user.user_profile.photo)? 
                                        user.user_profile.photo
                                        :"https://dummyimage.com/50x50/ced4da/6c757d.jpg"} 
                                    alt="..." 
                                    style={{height:"3rem",width:"3rem"}}/>
                                <div className="ms-3">
                                    <div className="fw-bold">{user.name}</div>
                                    <div className="text-muted">{(user.user_profile && 
                                                    user.user_profile.user_company)? 
                                                    user.user_profile.user_company:""}
                                    </div>                                    
                                </div>
                                {(Edit && post_project.status)?
                                    <button className="m-1 btn btn-light bg-transparent border-0" 
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        delete_unite(post_project.id, user.id)
                                    }}>
                                        <FontAwesomeIcon icon={faUserXmark}/>
                                    </button> 
                                    :null}                                                       
                            </div>
                        )):null}
                        {(Edit && post_project.status)?
                            <button className="m-5 btn btn-light bg-transparent border-0" 
                                onClick={onJoin}    >
                                <p className='m-0 p-0'><FontAwesomeIcon icon={faUserPlus}/></p>
                            </button>                            
                        :null
                        }
                    </div>
                    <div className="col-lg-9">
                        <article>
                            <header className="mb-4">
                                <h1 className="fw-bolder mb-1">{post_project.title}</h1>
                                <a className="badge bg-secondary text-decoration-none link-light" href="#!">{post_project.category}</a>
                                <div className="d-flex justify-content-between">
                                    <div className="text-muted fst-italic mt-2">{post_project.created_at}</div>
                                    {(post_project.status || post_project.status_unite)?
                                        <button onClick={onStateEdit} className='btn btn-light bg-transparent border-0'>
                                            <p className='m-0 p-0'><FontAwesomeIcon icon={Edit?faSquareCheck:faPencil}/></p>
                                        </button>
                                        :null 
                                    }           
                                </div> 
                                {post_project.github?
                                    <a className="btn text-decoration-none" target="_blank" rel="noreferrer" href={post_project.github}><FaGithub/></a>                                        
                                :null}
                            </header>
                            <div className='mb-5'></div>
                            {/* Articulos creados del proyecto */}
                            {list_sections.map((section)=>(
                            <div key={section.id} className={Edit?"card mb-5 p-1":"m-0 p-0"}>
                                <section>
                                    {section.title?
                                        <h2 className="fw-bolder mb-3 mt-2">{section.title}</h2>
                                    :null}
                                    {section.photo?
                                        <figure className="mb-3">
                                            <img className="img-fluid rounded" 
                                                src={section.photo}
                                                alt="..."
                                                style={{height:"30rem",width:"100%"}} />
                                        </figure>
                                    :null}
                                    {section.desc?
                                        //<p className="fs-5 mb-3">{section.desc}</p>
                                        <MDEditor.Markdown source={section.desc} escapeHtml={true} skipHtml={true} transformLinkUri={null} />
                                    :null}
                                    {section.code?
                                        <Highlight {...defaultProps}  code={`${section.code}`} language="python" theme={theme}>
                                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                            <pre className={className} style={style}>
                                                {tokens.map((line, i) => (
                                                <div {...getLineProps({ line, key: i })}>
                                                    {line.map((token, key) => (
                                                    <span {...getTokenProps({ token, key })} />
                                                    ))}
                                                </div>
                                                ))}
                                            </pre>
                                            )}
                                        </Highlight>
                                    :null}                                    
                                    {((post_project.status || post_project.status_unite) && Edit)?
                                        <div className="divider">
                                            <span></span>
                                            <button onClick={()=>onEdit(section)} className='btn btn-sm'>
                                                <p className='m-0 p-0'>Editar</p>
                                            </button>
                                            <span></span>
                                        </div>
                                    :null
                                    }
                                </section>
                            </div>
                            ))}

                        </article>  
                        {((post_project.status || post_project.status_unite) && Edit)? 
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-toggle="button" 
                                aria-pressed="false"
                                onClick={(e)=>(Set_view_new_section(true))}>
                                Crear Nueva Sección
                            </button> 
                        :null}                   
                    </div>                        
                </div>
            </div>
            <AddSection />
            <EditSection />
            <NewUnite />
        </section>
        :null}
    </Layout>
  )
}
const mapStateToProps = state => ({
    post_project: state.Projects.post_project,
    list_sections: state.Section.list_sections,
    users_unite: state.Unite.users_unite,
})
export default connect(mapStateToProps, {
    Set_view_new_section,
    // set_post_project,
    edit_section,
    Set_view_edit_section,
    // reset_section_status,
    Set_view_unite_user,
    delete_unite,
    reset_unite_status
})(PostProject)