import React from 'react'
import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import { createRenderer } from 'react-addons-test-utils'

import App from '../src/components/App'

describe('App', () => {
  let shallowRenderer

  beforeEach(() => {
    shallowRenderer = createRenderer()
  })

  it('renders correctly', () => {
    shallowRenderer.render(<App />)
    const result = shallowRenderer.getRenderOutput()
    expect(result.props.children).to.equal('Hello, world.')
  })
})
