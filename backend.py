# backend.py
from fastapi import FastAPI
from pydantic import BaseModel
import ollama
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Allow your React app to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
def generate_code(request: PromptRequest):
    print(f"\n🚀 STARTING GENERATION FOR: {request.prompt}")
    start_time = time.time()
    
    # The System Prompt is the "Secret Sauce" for quality
    system_prompt = """
    You are an expert Frontend Architect.
    Build a modern React component using Tailwind CSS.
    
    RULES:
    1. Output ONLY the code. No explanation.
    2. Use 'lucide-react' for icons.
    3. Use 'export default function App()'.
    4. Style heavily with Tailwind (gradients, shadows, rounded-xl).
    5. Ensure the code is complete and not truncated.
    """

    try:
        # CHANGED: Using '7b' model for faster speed on CPU. 
        # If still too slow, change '7b' to '1.5b'
        response = ollama.chat(model='qwen2.5-coder:7b', messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': request.prompt},
        ])
        
        generated_code = response['message']['content']
        
        print(f"✅ FINISHED in {round(time.time() - start_time, 2)} seconds.")
        return {"code": generated_code}

    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return {"code": f"// Error generating code: {str(e)}"}

# To run this: uvicorn backend:app --reload