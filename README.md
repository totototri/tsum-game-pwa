# README.mdを作成
cat > README.md << 'EOF'
# ツムゲーム PWA

ツムツム風のパズルゲームのPWA（Progressive Web App）版です。

## 特徴

- 🎮 ブラウザで動作するツムツム風ゲーム
- 📱 PWA対応（アプリとしてインストール可能）
- 🔄 オフラインプレイ対応
- 📲 スマートフォン・タブレット対応

## プレイ方法

1. ゲーム開始ボタンをクリック
2. 同じ色のツムをドラッグして繋げる
3. 3個以上繋げると消去されてスコア獲得
4. 60秒以内により高いスコアを目指そう！

## 技術スタック

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- Service Worker (オフライン対応)
- Web App Manifest (PWA対応)

## ローカル開発

```bash
# HTTPサーバーを起動（Python 3の場合）
python -m http.server 8000

# または Node.js の場合
npx serve .
