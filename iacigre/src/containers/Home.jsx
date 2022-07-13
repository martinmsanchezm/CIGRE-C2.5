import Layout from "../hocs/Layout"
import { connect } from 'react-redux';
import { useEffect } from "react";
const Home = ({
    
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <Layout>
            <h1>Home</h1>
        </Layout>
    )
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps,{
}) (Home)