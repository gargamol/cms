class articleResolverLogic {

    static async sidebars(parent, variables, context, info) {
    //static async sidebars(parent) {
        const { sidebars } = parent;
        if (!isArray(sidebars)) return [];
        return sidebars.map(({ body } = {}) => body).filter(v => v);
    }

}