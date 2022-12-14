import React, {Component} from "react";
import Articles from "./article/Articles";

class SeccionPruebas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contador: 0
        }
    }

    sumar = (e) => {
        this.setState({
            contador: this.state.contador + 1
        })
    }
    restar = (e) => {
        this.setState({
            contador: this.state.contador - 1
        })
    }


    render() {
        return (
            <section id="content">
                <Articles/>
                <Articles/>
                <Articles/>
                <h2 className="subheader">Estado</h2>
                <p>Contado: {this.state.contador}</p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar.bind(this)}/>
                    <input type="button" value="Restar" onClick={this.restar.bind(this)}/>
                </p>
            </section>
        );
    }
}

export default SeccionPruebas;
