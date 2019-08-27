import React, { useState, createRef } from 'react'
import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div(
  {
    position: 'relative',
    width: '100%',
    marginBottom: '0.5rem',
  },
  ({ textarea }) =>
    textarea
      ? {}
      : {
          height: '4rem',
        },
)
const centerLabelStyles = {
  top: '1rem',
  fontSize: '1em',
}
const pushedUpLabelStyles = {
  top: '0.4rem',
  fontSize: '0.75em',
}
const Label = styled.label(
  {
    position: 'absolute',
    left: '1rem',
    right: '1rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#999',
    transition: 'top 100ms, font-size 100ms',
    transitionTimingFunction: 'ease-out',
  },
  ({ hasValue, hasFocus }) => ({
    ...(hasValue || hasFocus ? pushedUpLabelStyles : centerLabelStyles),
    ':focus': pushedUpLabelStyles,
  }),
)
const DisabledIcon = styled.i({
  position: 'absolute',
  top: '0.4rem',
  right: '0.4rem',
  color: '#5cb85c',
})
const Input = styled.input({
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
  borderRadiusBottomRight: 0,
  padding: '1.5rem 0.8rem 0.3rem',
})
const Textarea = styled.textarea({
  width: '100%',
  border: '1px inset #eee',
  borderRadius: '0.5rem',

  padding: '1.5rem 0.8rem 0.3rem',
})

const TextInput = ({ name, label, value, disabled, textarea, onChange }) => {
  const [hasFocus, setHasFocus] = useState(false)

  const input = createRef()

  const focusInput = () => {
    if (document.activeElement !== input) {
      input.current.focus()
      setHasFocus(true)
    }
  }

  const removeFocus = () => setHasFocus(false)

  return (
    <Container textarea={textarea}>
      <Label
        htmlFor={name}
        hasValue={Boolean(value)}
        hasFocus={hasFocus}
        onClick={focusInput}>
        {label}
      </Label>
      {disabled && <DisabledIcon className="fa fa-asterisk" />}
      {textarea ? (
        <Textarea
          ref={input}
          name={name}
          value={value}
          onFocus={focusInput}
          onBlur={removeFocus}
          onChange={onChange}
        />
      ) : (
        <Input
          ref={input}
          name={name}
          value={value}
          disabled={disabled}
          onFocus={focusInput}
          onBlur={removeFocus}
          onChange={onChange}
        />
      )}
    </Container>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput
