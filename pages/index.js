
import React from 'react'
import { withPostsFilterBy, inCategory } from 'nextein/posts'
import { Content as PostContent } from 'nextein/post'
import styled, { css } from 'react-emotion'

import Header from '../components/header'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import withPageView from '../components/analytics'
import withStyles from '../components/styled'

const classnames = (...args) => args.join(' ')
const sortByOrder = (a, b) => a.data.order - b.data.order

const withIndexSections = withPostsFilterBy(inCategory('section', { includeSubCategories: true }))

const Index = withIndexSections(({ posts }) => {
  
  const sections = posts.sort(sortByOrder)

  return (
    <Main>
      <Navigation style={{ position: 'absolute', width: '100vw' }}/>      
      <Header />
      {
        sections.map((post, idx) => {
          const { className, title } = post.data
          const kind = (idx % 2) === 0 ? 'reversed' : ''
          return (
            <Section className={classnames(kind, className)} key={`section-${idx}`}>
              <Title>{title}</Title>
              <Content {...post} />
            </Section>
          )
        })
      }
      <Footer />
    </Main>
  )
})

export default withPageView(withStyles(Index))

// --- styled ---

const Main = styled('main')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Section = styled('section')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  min-height: 70vh;
  padding: 120px 10vw;

  &:last-of-type {
    padding-bottom: 120px;
  }

  background-image: radial-gradient(circle at center, #fff 0%,  #e9e9e9 100%);
  text-shadow: 0 0 1px #eee;

  &.reversed {
    flex-direction: row-reverse;    
    background-image: radial-gradient(circle at center , rgb(68, 60, 60) 0%, #272121 100%);
    text-shadow: 0 0 1px #000;

    text-align: right;
    color: #e4e4e4;
  }
`

const Title = styled('h1')`
  flex: 1;

  display: flex;
  flex-direction: column-reverse;

  text-align: center;
  font-weight: 100;
  font-size: 3.5em;
  color: #f63;
`

const Content = styled(PostContent)`
  flex: 1;

  font-size: 1.5em;
  font-weight: 200;
  line-height: 1.5em;

  a, a:hover, a:visited {
    color: #666;
    text-decoration: none;
    font-weight: 400;
  }

  code {
    background: #e4e4e4;
    padding: 10px;    
  }
`
