function makePageVars(variables) {
  return `:root {
${variables.map((vv) => {
    return vv[0] + ": " + vv[1] + ";";
  }).join("\n")
    }
}
`;
}
