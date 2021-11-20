export default function (Quill) {
  // 引入源码中的BlockEmbed
  const BlockEmbed = Quill.import("blots/block/embed");
  // 定义新的blot类型
  class FileEmbed extends BlockEmbed {
    file = {};
    state = "beforeCreate";
    node = null;
    static create(value) {
      console.log(value);
      const { File, callback } = value;
      if (File) {
        this.file = File;
        console.log("create", File);
      } else {
        this.file = value;
      }
      this.node = super.create();
      this.node.setAttribute("contenteditable", "false");
      this.node.setAttribute("width", "100%");
      this.transformValue();
      if (!this.file.state) {
        this.setState("beforeUpload");
        this.upload(callback);
      } else {
        this.setState(this.file.state);
      }

      console.log(this.node);
      return this.node;
    }

    static transformValue() {
      const file = this.file;
      let value = `<span class="filename">${
        this.state == "success" ? file.size : "" + file.name
      }</span>`;
      let handleArr = value.split("\n");
      handleArr = handleArr.map((e) =>
        e.replace(/^[\s]+/, "").replace(/[\s]+$/, "")
      );
      console.log(handleArr);
      this.node.innerHTML = handleArr.join("");
    }

    static setState(state) {
      this.state = state;
      this.node.setAttribute("data-status", state);
    }

    static upload(callback) {
      setTimeout(() => {
        this.setState("success");
        this.transformValue();
        if (callback) {
          callback("success");
        }
      }, 1000);
    }
    // 返回节点自身的value值 用于撤销操作
    static value() {
      const { name, size } = this.file;
      return {
        name,
        size,
        state: this.state,
      };
    }
  }
  // blotName
  FileEmbed.blotName = "FileEmbed";
  // class名将用于匹配blot名称
  FileEmbed.className = "embed-file";
  // 标签类型自定义
  FileEmbed.tagName = "div";
  Quill.register(FileEmbed, true);
}
