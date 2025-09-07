from pydantic import BaseModel, Field
from typing import Dict, Literal

DocType = Literal["WILL", "POA"]

class GeneratePdfRequest(BaseModel):
    doc_type: DocType = Field(description="Type of document: WILL or POA")
    data: Dict[str, str] = Field(description="Form data mapping placeholders to values")
