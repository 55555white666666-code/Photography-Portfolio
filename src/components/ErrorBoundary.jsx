import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-screen">
          <p className="eyebrow">Runtime Error</p>
          <h1>页面加载失败</h1>
          <p>
            请检查 `src/data/photos.js` 中新加入的照片数据，常见原因是漏写
            `src`、`date`、`tags` 等字段，或字段名仍使用了旧的 `image`、`year`。
          </p>
          <code>{this.state.error.message}</code>
        </main>
      );
    }

    return this.props.children;
  }
}
