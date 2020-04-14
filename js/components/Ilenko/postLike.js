class PostLike extends Component {
  render({ item }) {
    return `<div class="post_like">
            ${this.childrens.create(PostLikeSmiles, { item })}
        </div>`;
  }
}

class PostLikeSmiles extends Component {
  constructor({ item }) {
    super();
    this.state.item = item;
  }

  beforeMount() {
    this.setState({
      likes: [
        {
          img: {
            alt: "Fire",
            scr: "img/post/fire.png",
          },
          count: this.state.item.likeFire,
          className: "post_like_smiles",
        },
        {
          img: {
            alt: "heartEyes",
            scr: "img/post/heartEyes.png",
          },
          count: this.state.item.likeHeartEyes,
          className: "post_like_smiles",
        },
        {
          img: {
            alt: "rocket",
            scr: "img/post/rocket.png",
          },
          count: this.state.item.likeRocket,
          className: "post_like_smiles",
        },
        {
          img: {
            alt: "like",
            scr: "img/post/like.png",
          },
          count: this.state.item.likeLike,
          className: "post_like_smiles",
        },
        {
          img: {
            alt: "bomb",
            scr: "img/post/bomb.png",
          },
          count: this.state.item.likeBomb,
          className: "post_like_smiles",
        },
        {
          img: {
            alt: "comment",
            scr: "img/post/comment.png",
          },
          count: this.state.item.commentLenght,
          className: "post_like_comment",
        },
      ],
    });
  }

  render(options, { likes }) {
    return likes.map(this.renderPersonsMiniListAva).join("\n");
  }

  renderPersonsMiniListAva({ img, count, className }) {
    return `<div class=${className}>
                <img class="post_like_smiles__img" src=${img.scr} alt=${img.alt}>
                <span class="post_like_smiles__text" >${count}</span>
            </div>`;
  }
}
