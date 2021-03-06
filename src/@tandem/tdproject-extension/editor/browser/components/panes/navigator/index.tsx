import "./index.scss";
import React =  require("react");
import { TreeComponent } from "@tandem/uikit";
import { OpenFileRequest } from "@tandem/editor/common/messages";
import {  EditorStoreProvider } from "@tandem/editor/browser/providers";
import { EditorStore, Workspace } from "@tandem/editor/browser/stores";
// import { DirectoryModel, FileModel, BaseFSModel } from "@tandem/editor/common/models";
import { BaseApplicationComponent, TreeNode, inject } from "@tandem/common";

export class NavigatorPaneComponent extends BaseApplicationComponent<{ store?: EditorStore, workspace: Workspace }, any> {
  @inject(EditorStoreProvider.ID)
  private _store: EditorStore;

  render() {
    // const cwd = (this.props.store || this._store).cwd;
    if (!this.props.workspace) return null;

    return null;

    // return <div className="modules-pane">
    //   <div className="td-section-header">
    //     {cwd.name}
    //   </div>
    //   <TreeComponent
    //     nodes={cwd.children}
    //     select={node => {
    //       this.props.workspace.select(node)
    //       if (!node.children.length && node instanceof DirectoryModel) {
    //         (node as DirectoryModel).load();
    //       }

    //       if (node instanceof FileModel) {
    //         this.bus.dispatch(new OpenFileRequest(node.path));
    //       }
    //     }}
    //     isNodeDraggable={node => {
    //       return !(node instanceof DirectoryModel);
    //     }}
    //     onNodeDragStart={(node: FileModel, event: React.DragEvent<any>) => {
    //       event.dataTransfer.setData("URI", node.path);
    //     }}
    //     isNodeHovering={node => false}
    //     isNodeSelected={node => this.props.workspace.selection.indexOf(node) !== -1}
    //     renderLabel={node => (node as BaseFSModel).name}
    //     hasChildren={node => node instanceof DirectoryModel}
    //     isNodeExpanded={node => node.children.length}
    //     toggleExpand={node => node.children.length ? node.removeAllChildren() : (node as DirectoryModel).load()}
    //      />
    // </div>
  }
}