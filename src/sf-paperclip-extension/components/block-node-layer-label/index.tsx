import "./index.scss";

import * as cx from "classnames";
import * as React from "react";
import { SelectAction } from "sf-front-end/actions";
import * as AutosizeInput from "react-input-autosize";
import { LayerLabelComponentFactoryDependency } from "sf-front-end/dependencies";
import { PCBlockNodeEntity, PCBlockNodeExpression } from "sf-paperclip-extension/ast";

class BlockLayerLabel extends React.Component<{ entity: PCBlockNodeEntity, connectDragSource: Function }, any> {

  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  editLabel() {
    this.setState({
      edit: true
    });
  }

  render() {

    const edit = this.state.edit;
    const connectDragSource = this.props.connectDragSource;

    return connectDragSource(<span
      className="m-label m-block-node-layer-label"
      title={this.props.entity.source.value}
      onDoubleClick={this.editLabel.bind(this)}>
      {
         String(this.props.entity.source.value || "").trim()
      }
    </span>);
  }

  doneEditing() {
    this.setState({ edit: false });
  }

  onInputKeyDown(event) {
    if (event.keyCode === 13) {
      this.doneEditing();
    }
  }

  onInputFocus(event) {
    event.target.select();
  }
}

export const dependency = new LayerLabelComponentFactoryDependency(PCBlockNodeExpression.name, BlockLayerLabel);
