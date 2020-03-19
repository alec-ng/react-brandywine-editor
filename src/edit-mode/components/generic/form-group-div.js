import React from 'react';

/**
 * Bootstrap styled from element container with nested label structure
 */
export default function FormGroupDiv({ children }) {
  return (
    <div className="form-group" style={{ marginBottom: '5px' }}>
      <label style={{ width: '100%' }}>
        {children}
      </label>
    </div>
  )
}