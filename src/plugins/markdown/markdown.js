import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export const VARIATION_DEFAULT = "markdown_default";

export function MarkdownElement(props) {
  return (
    <Container className="
      brandywine-responsive-x-padding 
      brandywine-width_large
      mx-auto 
      py-1 
    ">
      {props.baseAttrs.source ? (
        <ReactMarkdown
          source={props.baseAttrs.source}
          renderers={{
            table: Table,
            blockquote: Blockquote
          }}
        />
      ) : (
        <h6 className="text-center text-muted">
          Markdown will be rendered here
        </h6>
      )}
    </Container>
  );
}

const Table = function(props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        {props.children}
      </table>
    </div>
  );
};

const Blockquote = function(props) {
  return <StyledBlockquote>{props.children}</StyledBlockquote>;
};

const Container = styled.div`
  & p:last-child {
    margin-bottom: 0;
  }
`;

// Modified from https://codepen.io/johnfinkdesign/pen/gRvEGq
const StyledBlockquote = styled.blockquote`
  margin-left: 0.5rem;
  font-style: italic;
  line-height: 1.5em;
  padding: 1em;
  padding-left: 1.5rem;
  position: relative;
  transition: 0.2s border ease-in-out;
  z-index: 0;

  & p:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: "\\201D";
    position: absolute;
    font-family: Inria Serif;
    font-size: 40px;
    top: 50%;
    left: -0.5em;
    color: inherit;
    font-style: normal;
    line-height: 1em;
    text-align: center;
    text-indent: -2px;
    width: 1em;
    margin-top: -0.33em;
    transition: 0.2s all ease-in-out, 0.4s transform ease-in-out;
  }
  &.format:before,
  &.format:after {
    display: none;
  }
  &.book:after {
    content: "\\201D";
  }
  &.podcast:after {
    content: "\\201D";
  }
  &.lyrics:after {
    content: "\\201D";
  }
  &.favorite:after {
    content: "\\201D";
  }
  &:active:after {
    transform: rotateY(360deg);
  }
  & cite {
    display: block;
    line-height: 1.8em;
    margin-top: 1em;
  }

`;
