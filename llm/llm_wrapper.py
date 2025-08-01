# llm_wrapper.py
from langchain_community.llms import LlamaCpp
from typing import Optional, Iterator, Any

class LlamaCppWithFunctions(LlamaCpp):
    """
    Subclass LlamaCpp to strip out function‐calling kwargs
    and to accept LangChain’s extra positional args.
    """

    def _call(
        self,
        prompt: str,
        stop: Optional[list[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs,
    ) -> str:
        # Remove any function‐calling parameters
        kwargs.pop("functions", None)
        kwargs.pop("function_call", None)
        # Delegate to the base LlamaCpp _call
        return super()._call(prompt=prompt, stop=stop, **kwargs)

    def _stream(
        self,
        prompt: str,
        stop: Optional[list[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs,
    ) -> Iterator[str]:
        # Strip out function‐calling params here too
        kwargs.pop("functions", None)
        kwargs.pop("function_call", None)
        # Delegate to the base LlamaCpp streaming
        yield from super()._stream(prompt=prompt, stop=stop, **kwargs)
