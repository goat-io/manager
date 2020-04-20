import React from "react";
import { shallow } from "enzyme";

interface LinkProps {
  className?: string;
  href: string;
}

const Link: React.FC<LinkProps> = ({ className, href, children }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

describe("Link", () => {
  it("renders without crashing", () => {
    shallow(<Link href="http://google.com">Hello From Jest</Link>);
  });

  it("Renders link to Google", () => {
    const wrapper = shallow(
      <Link href="http://google.com">Hello From Jest</Link>
    );
    expect(wrapper.contains("Hello From Jest")).toBe(true);
  });
});
