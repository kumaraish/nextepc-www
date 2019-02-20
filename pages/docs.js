
import React, { Component } from  'react'
import styled from 'react-emotion'
import Head from 'next/head'

import withPost, { Content } from 'nextein/post'
import { withPostsFilterBy, inCategory } from 'nextein/posts'

import MainNavigation from '../components/navigation'
import Navigation from '../components/docs/navigation'
import { Main, Section, Side, Article, Title, Category, Paragraph, Blockquote, CodeBlock, List } from '../components/elements'
import Code from '../components/code'
import Footer from '../components/footer'
import withPageView from '../components/analytics'
import withStyles from '../components/styled'

const withDocs = withPostsFilterBy(inCategory('docs', { includeSubCategories: true }))

const Doc = withPost(withDocs( ( { post: current, posts } ) => {
  posts.sort((a, b) => a.data.order - b.data.order )
  const post = current || posts[0]
  
  return (
    <Main>
      <Head>
        <title>NextEPC | Docs | {post.data.title}</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css" />
      </Head>

      <MainNavigation showHome title="documentation" styles={{ width: `100vw` }}/>

      <Section>
        <Side>
          <Navigation docs={posts} post={post} />
        </Side>
        <Article>
          <Category>{post.data.category}</Category>
          <Title>{post.data.title}</Title>
          <Content
            {...post}
            renderers={{
              h2: MethodName,
              blockquote: Blockquote,
              code: Code,
              p: Paragraph,
              pre: CodeBlock,
              ul: List
            }}
          />
        </Article>
      </Section>
      <Footer />
    </Main>
  )
}))

export default withPageView(withStyles(Doc))

const MethodName = styled('div')`
  font-size: 1.8em;
  line-height: 2em;
  font-weight: 600;
  color: #000;
  margin: 2em 0 0 -2px;

  > em {
    font-weight: 200;
    letter-spacing: -0.8px;
    padding: 0 4px;    
  }
`
