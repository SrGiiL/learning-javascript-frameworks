import React, {Component} from "react";
import axios from "axios";
import Sidebar from "../../sidebar/Sidebar";
import {Redirect} from "react-router-dom";
import Global from "../../../Global";
import SimpleReactValidator from "simple-react-validator";
import swal from 'sweetalert';

class CreateArticle extends Component {

    url = Global.urlApi;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator(Global.messageValidator);
    }

    saveArticle = (e) => {
        e.preventDefault();

        this.changeState();

        if (this.validator.allValid()) {

            // Save article with http
            axios.post(this.url + 'create-article', this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo creado',
                            'El artículo ha sido creado correctamente',
                            'success'
                        )

                        // Subir fichero
                        if (this.state.selectedFile !== null) {
                            let articleId = this.state.article._id;
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            axios.post(this.url + 'upload-file/' + articleId, formData)
                                .then(res => {
                                        if (res.data.article) {
                                            this.setState({
                                                article: res.data.article,
                                                status: 'success'
                                            });
                                        } else {
                                            this.setState({
                                                article: res.data.article,
                                                status: 'failed'
                                            });
                                        }
                                    }
                                )
                        } else {
                            this.setState({
                                status: 'failed'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                        console.log('No se guardó');
                    }
                });

        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }


    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })

        this.validator.showMessages();
        this.forceUpdate();
    }

    changeFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to={'/blog'}/>;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear artículo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="articleTitle">Título</label>
                            <input type="text" name="title" id="articleTitle" ref={this.titleRef}
                                   onChange={this.changeState} />
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="articleContent">Contenido</label>
                            <textarea name="content" id=" articleContent" ref={this.contentRef}
                                      onChange={this.changeState} />
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="articleImage">Imagen</label>
                            <input type="file" name="file0" id="articleImage" onChange={this.changeFile} />
                        </div>

                        <div className="clearfix"/>

                        <input type="submit" value="Guardar" className="btn btn-success"/>
                    </form>

                </section>

                <Sidebar
                    blog=" true"/>

                <div className=" clearfix"/>
            </div>
        )
    }
}

export default CreateArticle;
