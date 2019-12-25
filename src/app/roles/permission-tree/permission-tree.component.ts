import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { PermissionDto } from '@shared/service-proxies/service-proxies';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.css']
})
export class PermissionTreeComponent implements OnInit {
  private treeNodes: PreesionTreeNode[] = [];
  private nestedDataSource: MatTreeFlatDataSource<PreesionTreeNode, PreesionItemFlatNode>;
  private flatNodeMap = new Map<PreesionItemFlatNode, PreesionTreeNode>();
  private nestedNodeMap = new Map<PreesionTreeNode, PreesionItemFlatNode>();
  private selectedParent: PreesionItemFlatNode | null = null;
  private nestedTreeControl: FlatTreeControl<PreesionItemFlatNode>;
  private checklistSelection = new SelectionModel<PreesionItemFlatNode>(true);
  private treeFlattener: MatTreeFlattener<PreesionTreeNode, PreesionItemFlatNode>;


  private getLevel = (node: PreesionItemFlatNode) => node.level;
  private isExpandable = (node: PreesionItemFlatNode) => node.expandable;
  private getChildren = (node: PreesionTreeNode): PreesionTreeNode[] => node.children;
  private hasChild = (_: number, node: PreesionItemFlatNode) => node.expandable;
  isStatic = false;
  constructor() {
  }

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.nestedTreeControl = new FlatTreeControl<PreesionItemFlatNode>(this.getLevel, this.isExpandable);
  }

  getCheckListSelection() {
    return this.checklistSelection.selected;
  }

  grantedPermission(grantedPermissionNames: string[], isStatic: boolean) {
    this.isStatic = isStatic;
    const arr: PreesionItemFlatNode[] = [];
    _.map(this.treeNodes, (item, index) => {
      if (_.includes(grantedPermissionNames, item.name)) {
        arr.push(this.nestedNodeMap.get(item));

      }
    });
    this.checklistSelection.select(...arr);
  }
  private expandClick($event) {
    $event.preventDefault();
  }
  show(node: PermissionDto[]) {
    node.forEach(d => {
      const count = d.name.split('.').length;
      this.treeNodes.push({ children: [], expandable: false, level: count, name: d.name, key: d.name, description: d.description, parent: null });
    });
    const nodes = this.treeNodes.concat();
    nodes.forEach(item => {
      this.buildFileTree(item);
    });
    this.nestedDataSource = new MatTreeFlatDataSource(this.nestedTreeControl, this.treeFlattener);

    this.nestedDataSource.data = this.treeNodes.filter(d => d.parent == null);
  }

  private buildFileTree(item: PreesionTreeNode) {
    var nameArr = item.name.split('.');
    if (nameArr.length > 1) {
      let parentName = '';
      for (let index = 0; index < nameArr.length - 1; index++) {
        parentName += `.${nameArr[index]}`;
      }
      parentName = parentName.substring(1);
      const find = this.treeNodes.filter(d => d.name == parentName);
      let node: PreesionTreeNode;
      if (!find || find.length == 0) {
        node = { children: [], expandable: false, level: item.level - 1, name: parentName, key: '', description: 'parent', parent: null }
        this.treeNodes.push(node);
      } else {
        node = find[0];
      }

      const temp = node.children.filter(d => d.name == item.name);
      if (temp && temp.length == 0) {
        node.children.push(item);
        node.expandable = true;
        item.parent = node;
      }

      this.buildFileTree(node);
    }

  }

  private transformer = (node: PreesionTreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new PreesionItemFlatNode();
    flatNode.name = node.name;
    flatNode.key = node.key;
    flatNode.level = level;
    flatNode.expandable = node.expandable;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
  private descendantsAllSelected(node: PreesionItemFlatNode): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }
  private descendantsPartiallySelected(node: PreesionItemFlatNode): boolean {
    const descendants = this.nestedTreeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  private todoItemSelectionToggle(node: PreesionItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);

  }
  private todoLeafItemSelectionToggle(node: PreesionItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  private checkAllParentsSelection(node: PreesionItemFlatNode): void {
    let parent: PreesionItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  private checkRootNodeSelection(node: PreesionItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.nestedTreeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
  private getParentNode(node: PreesionItemFlatNode): PreesionItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.nestedTreeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.nestedTreeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

}

class PreesionTreeNode {
  parent: PreesionTreeNode;
  children: PreesionTreeNode[];
  expandable: boolean;
  level: number;
  name: string;
  key: string;
  description: string;
}


class PreesionItemFlatNode {
  name: string;
  key: string;
  level: number;
  expandable: boolean;
}