//ErrorBoundary

// ErrorBoundary.js

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // エラーが発生した場合に state を更新してエラーを表示する
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // エラーをログに記録することもできます
        console.error('エラーが発生しました:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // エラーメッセージを表示する
            return (
                <div>
                    <h2>申し訳ありません、何かがうまくいかないようです。</h2>
                    <p>問題が解決されるまでお待ちください。</p>
                </div>
            );
        }

        // エラーがない場合は、子コンポーネントをレンダリングする
        return this.props.children;
    }
}

export default ErrorBoundary;
