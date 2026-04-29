import { useEffect, useState } from 'react';
import { assetUrl } from './assetPath';

export function useMarkdown(markdownPath) {
  const [state, setState] = useState({
    content: '',
    loading: Boolean(markdownPath),
    error: '',
  });

  useEffect(() => {
    let cancelled = false;

    if (!markdownPath) {
      setState({ content: '', loading: false, error: '' });
      return;
    }

    setState({ content: '', loading: true, error: '' });

    fetch(assetUrl(markdownPath))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Markdown load failed: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        if (!cancelled) {
          setState({
            content: stripFirstHeading(text),
            loading: false,
            error: '',
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ content: '', loading: false, error: error.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [markdownPath]);

  return state;
}

function stripFirstHeading(markdown) {
  return markdown.replace(/^#\s+.+?(\r?\n)+/, '');
}
