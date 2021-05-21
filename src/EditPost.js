import React, { Component } from "react";

import HtmlEditor, {
  Toolbar,
  MediaResizing,
  Item
} from "devextreme-react/html-editor";

import { db } from "./config";
import { Link } from "react-router-dom";

import "./NewPost.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
const fontValues = [
  "Arial",
  "Courier New",
  "Georgia",
  "Impact",
  "Lucida Console",
  "Tahoma",
  "Times New Roman",
  "Verdana"
];

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.location.state.id,
      title: props.location.state.title,
      valueContent: props.location.state.content,
      category: props.location.state.category,
      url: "",
      arquivo: null,
      progress: 0,
      btn: ""
    };
    this.valueChanged = this.valueChanged.bind(this);
    this.valueTypeChanged = this.valueTypeChanged.bind(this);
  }

  componentDidMount() {
    //rolar para o topo da página
    window.scrollTo(0, 0);
    console.log(this.props);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  valueChanged(e) {
    this.setState({
      valueContent: e.value
    });
  }
  valueTypeChanged(e) {
    this.setState({
      editorValueType: e.addedItems[0].text.toLowerCase()
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let timestamp = new Date();
    let id = this.state.id;

    const ref = db.ref("posts/" + id);
    let date = `${timestamp.toLocaleDateString()}, ${timestamp.toLocaleTimeString()}`;
    //const ref = db.ref('posts');
    var { url, title, category } = this.state;
    let content = this.state.valueContent;

    ref.set({
      category: category,
      title: title,
      content: content,
      url: url,
      id: id,
      date: date
    });
    this.setState({
      title: "",
      content: "",
      url: "",
      arquivo: null,
      progress: 0
    });
    this.setState({
      valueContent: ""
    });
    this.props.history.push("/");
  };

  render() {
    let { valueContent, editorValueType } = this.state;
    return (
      <div>
        <div className="container mb-5">
          <h3 className="text-center mb-2">Creacion de la lección</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-sm">
                <label>Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-sm">
                <label>Categoria</label>
                <select
                  className="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <option defaultValue="Escoger">Escoger</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Arte">Arte</option>
                  <option value="Lore">Lore</option>
                  <option value="Programacion">Programación</option>
                  <option value="Saberes Ancestrales">
                    Saberes Ancestrales
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Content</label>

              <div className="widget-container">
                <HtmlEditor
                  value={valueContent}
                  valueType={editorValueType}
                  onValueChanged={this.valueChanged}
                  height={550}
                >
                  <MediaResizing enabled={true} />
                  <Toolbar>
                    <Item formatName="undo" />
                    <Item formatName="redo" />
                    <Item formatName="separator" />
                    <Item formatName="size" formatValues={sizeValues} />
                    <Item formatName="font" formatValues={fontValues} />
                    <Item formatName="separator" />
                    <Item formatName="bold" />
                    <Item formatName="italic" />
                    <Item formatName="strike" />
                    <Item formatName="underline" />
                    <Item formatName="separator" />
                    <Item formatName="alignLeft" />
                    <Item formatName="alignCenter" />
                    <Item formatName="alignRight" />
                    <Item formatName="alignJustify" />
                    <Item formatName="separator" />
                    <Item formatName="orderedList" />
                    <Item formatName="bulletList" />
                    <Item formatName="separator" />
                    <Item
                      formatName="header"
                      formatValues={this.headerValues}
                    />
                    <Item formatName="separator" />
                    <Item formatName="color" />
                    <Item formatName="background" />
                    <Item formatName="separator" />
                    <Item formatName="link" />
                    <Item formatName="image" />
                    <Item formatName="separator" />
                    <Item formatName="clear" />
                    <Item formatName="codeBlock" />
                    <Item formatName="blockquote" />
                  </Toolbar>
                </HtmlEditor>
              </div>
            </div>

            {!this.state.url.length && this.state.arquivo && (
              <div className="text-center mb-5">
                <div
                  className="spinner-border"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
            )}

            <button
              type="submit"
              href="/"
              className={`btn btn-primary mr-2 ${this.state.btn}`}
            >
              Submit
            </button>
            <Link to="/">
              <button type="submit" className="btn btn-outline-danger">
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default EditPost;
