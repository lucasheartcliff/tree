/* eslint-disable no-alert, no-console, react/no-find-dom-node */
import React from 'react';
import '../../assets/index.less';
import './basic.less';
import Tree, { TreeNode } from 'rc-tree';
import { CheckboxProps } from '@/TreeNode';

const CustomCheckbox: React.FC<CheckboxProps> = ({
  checked,
  onCheck,
  halfChecked,
  disableCheckbox,
  disabled,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !checked && halfChecked;
    }
  }, [inputRef, halfChecked]);

  return (
    <span onClick={onCheck}>
      <input
        ref={inputRef}
        type={'checkbox'}
        checked={checked}
        onClick={onCheck}
        disabled={disableCheckbox || disabled}
      />
    </span>
  );
};

class Demo extends React.Component<any, any> {
  static defaultProps = {
    keys: ['0-0-0-0'],
  };

  treeData: any[];
  tree: any;
  selKey: any;
  treeRef: React.RefObject<unknown>;

  constructor(props) {
    super(props);
    const { keys } = props;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
      checkedKeys: keys,
    };

    this.treeRef = React.createRef();
    this.treeData = [
      {
        key: '0-0',
        title: 'parent 1',
        children: [
          {
            key: '0-0-0',
            title: 'parent 1-1',
            children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }],
          },
          {
            key: '0-0-1',
            title: 'parent 1-2',
            children: [
              { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
              { key: '0-0-1-1', title: 'parent 1-2-1' },
              { key: '0-0-1-2', title: 'parent 1-2-2' },
              { key: '0-0-1-3', title: 'parent 1-2-3' },
              { key: '0-0-1-4', title: 'parent 1-2-4' },
              { key: '0-0-1-5', title: 'parent 1-2-5' },
              { key: '0-0-1-6', title: 'parent 1-2-6' },
              { key: '0-0-1-7', title: 'parent 1-2-7' },
              { key: '0-0-1-8', title: 'parent 1-2-8' },
              { key: '0-0-1-9', title: 'parent 1-2-9' },
              { key: 1128, title: 1128 },
            ],
          },
        ],
      },
    ];
  }

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({ checkedKeys });
  };

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  onDel = e => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  setTreeRef = tree => {
    this.tree = tree;
  };

  renderTreeNode = (treeNode = [], level = 0) => {
    return treeNode.map(({ key, title, children }) => (
      <TreeNode title={title} key={key} renderCheckbox={props => <CustomCheckbox {...props} />}>
        {this.renderTreeNode(children, level + 1)}
      </TreeNode>
    ));
  };

  render() {
    return (
      <div style={{ margin: '0 20px' }}>
        <h2>Custom Checkbox</h2>
        <input aria-label="good" />
        <Tree
          ref={this.setTreeRef}
          className="myCls"
          showLine
          checkable
          defaultExpandAll
          defaultExpandedKeys={this.state.defaultExpandedKeys}
          onExpand={this.onExpand}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.state.defaultCheckedKeys}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          onActiveChange={key => console.log('Active:', key)}
        >
          {this.renderTreeNode(this.treeData)}
        </Tree>
      </div>
    );
  }
}

export default Demo;
