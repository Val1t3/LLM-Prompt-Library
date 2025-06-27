# LLM-Prompt-Library

## Docker

Build image
```
docker build -t llm-image .
```

Run container
```
docker run -d --rm -p 5173:5173 --name llm-container llm-image
```