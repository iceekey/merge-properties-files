const { FuseBox } = require("fuse-box");
const { src, context, task, exec } = require("fuse-box/sparky");

context(
  class {
    config() {
      return FuseBox.init({
        target: "server",
        globals: this.globals || undefined,
        homeDir:  "src",
        output:   "$name.js"
      });
    }
  }
);

task("clean", async context => {
  await src("./dist")
    .clean("dist/")
    .exec();
});

task("build:example", async context => {
  await exec("clean");

  const fuse = context.config();

  fuse
    .bundle("dist/example")
    .instructions("> [example.js]")
    .completed(proc => proc.start());

  await fuse.run();
});

task("build", async context => {
  context.globals = { "default": "*" };

  const fuse = context.config();

  fuse.bundle("index")
  .instructions("> [main.js]");

  await fuse.run();
});
