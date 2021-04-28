import React, { Component } from "react";
import { db, auth } from "../config";

import HtmlEditor, {
  Toolbar,
  MediaResizing,
  Item
} from "devextreme-react/html-editor";

import "./Comment.css";

import _ from "lodash";

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

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autor: "",
      comentario: "",
      userID: "",
      id: this.props.id,
      comments: [],
      currentUser: ""
    };
    this.valueChanged = this.valueChanged.bind(this);
    this.valueTypeChanged = this.valueTypeChanged.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);

    const currentUser = auth.currentUser;
    if (currentUser) {
      this.setState({
        currentUser: currentUser.uid
      });
    }

    const ref = db.ref("comments/" + this.state.id);
    ref.on("value", (snap) => {
      const state = _.map(snap.val());
      this.setState({
        comments: state.reverse()
      });
    });
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
    var { comentario, autor, id } = this.state;

    let timestamp = new Date();
    let idC =
      timestamp.getMonth().toString() +
      timestamp.getDay().toString() +
      timestamp.getHours().toString() +
      timestamp.getMinutes().toString() +
      timestamp.getSeconds().toString() +
      timestamp.getMilliseconds().toString();
    let date = `${timestamp.toLocaleDateString()}, ${timestamp.toLocaleTimeString()}`;
    const ref = db.ref("comments/" + id).child(idC);

    ref.set({
      autor: autor,
      comentario: this.state.valueContent,
      id: id,
      idC: idC,
      date: date,
      userID: this.state.currentUser
    });
    this.setState({
      autor: "",
      comentario: ""
    });
    this.setState({
      valueContent: ""
    });
  };

  render() {
    let { valueContent, editorValueType } = this.state;
    //console.log(this.state.comments);
    return (
      <form
        onSubmit={this.handleSubmit}
        className="color py-2 mt-5 pl-3 pr-5 mb-0 "
      >
        <h5 className="my-2">Envia tu aporte</h5>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="autor"
            value={this.state.autor}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Aporte</label>
          <HtmlEditor
            name="comment"
            value={valueContent}
            valueType={editorValueType}
            onValueChanged={this.valueChanged}
            height={550}
            backgroundColor="#000000"
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
              <Item formatName="header" formatValues={this.headerValues} />
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
        <button type="submit" className="btn btn-secondary mr-2">
          Submit
        </button>
      </form>
    );
  }
}

export default Comment;
