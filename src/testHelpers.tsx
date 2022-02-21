import { render, RenderResult } from "@testing-library/react";
import { ReactNode } from "react";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";

type RenderWithRouter = (
  renderComponent: () => ReactNode,
  route?: string
) => RenderResult & { history: MemoryHistory };

declare global {
  namespace NodeJS {
    interface Global {
      renderWithRouter: RenderWithRouter;
    }
  }

  namespace globalThis {
    var renderWithRouter: RenderWithRouter;
  }
}

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }

  return {
    ...render(<Router history={history}>{renderComponent()}</Router>),
    history,
  };
};
