import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

const Example = ({ tags, setTags, placeholder }) => {
 return (
  <div>
   <TagsInput
    value={tags}
    onChange={setTags}
    name='costum label'
    placeHolder={placeholder}
    separators={['/', ' ', ',']}
    classNames={{ input: 'tags-input-component' }}
   />
  </div>
 );
};

export default Example;
